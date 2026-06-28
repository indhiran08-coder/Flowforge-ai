# Webhooks Guide
1. Add Webhook Trigger node as first node
2. Save workflow to generate URL
3. POST to /api/webhooks/:workflowId with JSON body
Access data with: {{ trigger.data.fieldName }}
