package config

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func DBconn() (db *sql.DB, err error) {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := ""
	dbName := "project_laporan"
}
