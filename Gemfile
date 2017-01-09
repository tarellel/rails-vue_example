source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# fast implementation of .blank?
gem 'fast_blank', git: 'https://github.com/SamSaffron/fast_blank.git'
gem 'mini_racer', git: 'https://github.com/discourse/mini_racer.git'
gem 'sassc-rails' # Libsass for rails pipeline (fast sass-rails replacement)

gem 'jbuilder', '~> 2.5'

# consider
# converts .vue files to js
# gem 'sprockets-vue', git: 'https://github.com/kikyous/sprockets-vue.git'
# Allows you to render Vue components with rails views
# gem 'vueport', git: 'https://github.com/samtgarson/vueport.git'
gem 'bootstrap', '~> 4.0.0.alpha5'
gem 'lodash-rails'
gem 'vuejs-rails'

source 'https://rails-assets.org' do
  gem 'rails-assets-axios'
end

group :development, :test do
  gem 'faker'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # to enable live reloading
  gem 'guard'
  gem 'guard-livereload', '~> 2.5', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
