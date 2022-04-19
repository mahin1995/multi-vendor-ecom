```
##mongodb export
mongodump --db <database name> --gzip -o <folder name where store>
```
```
##mongodb import
mongorestore --gzip --db "<new database name>" <path of export file>
```

```
pm2 start npm --name "ecom" -- start
```