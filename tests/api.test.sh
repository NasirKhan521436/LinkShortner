#!/usr/bin/env bash
set -e

BASE="${BASE_URL:-http://localhost:3000}"

echo "1) Healthcheck -> $BASE/healthz"
curl -s -f "$BASE/healthz" | jq .

echo "2) Create link code 'abc123' -> POST /api/links"
curl -s -X POST "$BASE/api/links" -H "Content-Type: application/json" \
  -d '{"target_url":"https://example.com","code":"abc123"}' | jq .

echo "3) Duplicate create returns 409"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/links" -H "Content-Type: application/json" \
  -d '{"target_url":"https://example.com","code":"abc123"}')
if [ "$STATUS" != "409" ]; then
  echo "Expected 409 on duplicate create, got $STATUS" >&2
  exit 1
fi
echo "Duplicate test OK (409)."

echo "4) Redirect returns 302"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -I "$BASE/abc123")
if [ "$STATUS" != "302" ]; then
  echo "Expected 302 for redirect, got $STATUS" >&2
  exit 1
fi
echo "Redirect 302 OK."

echo "5) Delete link"
curl -s -X DELETE "$BASE/api/links/abc123" -w "\nHTTP_CODE:%{http_code}\n"

echo "6) After delete, redirect is 404"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -I "$BASE/abc123")
if [ "$STATUS" != "404" ]; then
  echo "Expected 404 after delete, got $STATUS" >&2
  exit 1
fi
echo "Delete + 404 check OK."

echo "All API tests passed."
