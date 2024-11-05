# Transaction
In MongoDB, an operation on a single document is atomic. This reduces the need for distributed transactions by allowing related data to be stored in embedded documents within a single structure. The single-document atomicity is sufficient for many use cases. However, for cases requiring atomic reads and writes across multiple documents (in one or more collections), MongoDB offers distributed transactions.These transactions span multiple operations, collections, databases, documents, and even shards, providing atomicity for more complex scenarios.  

## Reference
[MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)