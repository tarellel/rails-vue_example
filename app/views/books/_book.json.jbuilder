json.extract! book, :id, :title, :pages, :reference, :created_at, :updated_at
json.url book_url(book, format: :json)