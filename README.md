### To install prisma run 

```bash
npm install prisma @prisma/client
```

### After the installation, we can then initialize Prisma with

```bash
npx prisma init
```


### RUN THIS To generate prisma after changing model 

```bash
npx prisma generate
```

### After creating new model run
```bash
npx prisma db push
```

### Refer to this prisma doc here

https://www.prisma.io/docs/orm/prisma-schema/data-model/models

### Read here for updating Model fields 
https://www.prisma.io/docs/orm/overview/databases/mongodb#how-to-migrate-existing-data-to-match-your-prisma-schema


### After adding a new Field on Schema 

```bash
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String
}
```

if you want to add new field like below make it option or give it default value

```bash

model User {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  email       String
  phoneNumber String?
}
```

giving it default value like below 

Then regenerate your Prisma Client using the npx prisma generate command. Next, update your application to reflect the new field, and redeploy your app.

As the phoneNumber field is optional, you can still query the old users where the phone number has not been defined. The records in the database will be updated "on demand" as the application's users begin to enter their phone number in the new field.

Another option is to add a default value on a required field, for example

```bash
model User {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  email       String
  phoneNumber String @default("000-000-0000")
}
```

Then when you encounter a missing phoneNumber, the value will be coerced into 000-000-0000.


