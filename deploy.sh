#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────
# KYA Mission Control — Cloud Run deploy
#
# One-shot script: build → push → deploy → smoke-test.
# Idempotent: re-running redeploys with a fresh tag.
#
# Prereqs (one-time):
#   gcloud auth login
#   gcloud config set project mas-ai-kya
#
# Usage:
#   bash deploy.sh                # uses defaults below
#   REGION=us-central1 bash deploy.sh   # override region
# ──────────────────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT="${PROJECT:-mas-ai-kya}"
REGION="${REGION:-northamerica-northeast1}"   # Toronto — matches Daena
SERVICE="${SERVICE:-kya-website}"
REPO="${REPO:-kya-website}"

# Tag with version + short git sha for deterministic, debuggable images.
VERSION="$(node -p "require('./package.json').version")"
SHA="$(git rev-parse --short HEAD 2>/dev/null || echo nogit)"
TAG="${VERSION}-${SHA}"

REGISTRY="${REGION}-docker.pkg.dev"
IMAGE="${REGISTRY}/${PROJECT}/${REPO}/${SERVICE}:${TAG}"
LATEST="${REGISTRY}/${PROJECT}/${REPO}/${SERVICE}:latest"

bold() { printf "\n\033[1;33m▶ %s\033[0m\n" "$*"; }

bold "Project: $PROJECT  Region: $REGION  Tag: $TAG"

# ── 1. Ensure required APIs are on (no-op if already enabled) ────────────
bold "Ensuring APIs enabled (run, artifactregistry)"
gcloud services enable run.googleapis.com artifactregistry.googleapis.com \
  --project="$PROJECT" --quiet

# ── 2. Ensure Artifact Registry repo exists ──────────────────────────────
bold "Ensuring Artifact Registry repo: $REPO"
gcloud artifacts repositories describe "$REPO" \
  --location="$REGION" --project="$PROJECT" --quiet >/dev/null 2>&1 || \
gcloud artifacts repositories create "$REPO" \
  --repository-format=docker --location="$REGION" \
  --description="KYA Mission Control website images" \
  --project="$PROJECT" --quiet

# ── 3. Authorize Docker for the registry ─────────────────────────────────
bold "Configuring Docker auth for $REGISTRY"
gcloud auth configure-docker "$REGISTRY" --quiet

# ── 4. Build (multi-stage, standalone Next.js) + tag both versioned + latest ─
bold "Building image: $IMAGE"
docker build -t "$IMAGE" -t "$LATEST" .

# ── 5. Push both tags ────────────────────────────────────────────────────
bold "Pushing image to $REGISTRY"
docker push "$IMAGE"
docker push "$LATEST"

# ── 6. Deploy to Cloud Run ───────────────────────────────────────────────
bold "Deploying to Cloud Run service: $SERVICE"
gcloud run deploy "$SERVICE" \
  --image="$IMAGE" \
  --region="$REGION" \
  --project="$PROJECT" \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --cpu=1 \
  --memory=512Mi \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --timeout=60s \
  --set-env-vars="NEXT_TELEMETRY_DISABLED=1" \
  --quiet

URL="$(gcloud run services describe "$SERVICE" \
  --region="$REGION" --project="$PROJECT" \
  --format="value(status.url)")"

# ── 7. Smoke-test ────────────────────────────────────────────────────────
bold "Smoke-testing $URL"
HTTP_CODE="$(curl -s -o /dev/null -w "%{http_code}" "$URL/" || echo 000)"
WAITLIST_CODE="$(curl -s -o /dev/null -w "%{http_code}" -X POST -H 'Content-Type: application/json' \
  -d '{"name":"smoketest","email":"smoke@test.invalid","website":"bot"}' "$URL/api/waitlist" || echo 000)"

bold "DEPLOY OK"
echo "  Live URL : $URL"
echo "  /        : HTTP $HTTP_CODE"
echo "  /api/waitlist (honeypot): HTTP $WAITLIST_CODE  (expect 200 silent)"
echo
echo "  Image    : $IMAGE"
echo "  Logs     : gcloud run services logs read $SERVICE --region=$REGION --project=$PROJECT --limit=50"
echo
echo "Next step: attach kya.mas-ai.co to this service via Cloud Run → Custom Domains"
echo "  (or update the Cloudflare CNAME from pages.dev to ghs.googlehosted.com)."
