import { mysqlTableCreator } from "drizzle-orm/mysql-core"

const schemaPrefix = ""

export const mysqlTable = mysqlTableCreator((name) => `${schemaPrefix}${name}`)
