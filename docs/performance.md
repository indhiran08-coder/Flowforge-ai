# Performance
- Cache API results in Set Variables nodes
- Place Filter nodes early to short-circuit expensive paths
- Indexes on userId, workflowId, createdAt for fast queries
- Node timeout: 30s per node, 5min total execution limit
