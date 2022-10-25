# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


Todo.create(
    title: "install devise",
    description: "for authentication",
    checked: true
)

Todo.create(
    title: "install devise_token_auth",
    description: "for jwt",
    checked: true
)

Todo.create(
    title: "set-up devise_token_auth",
    description: "",
    checked: true
)

Todo.create(
    title: "scaffold todos",
    description: "for mvp",
    checked: true
)

Todo.create(
    title: "make front-end",
    description: "",
    checked: false
)