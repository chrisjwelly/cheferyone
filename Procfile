web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-production}
release: bin/rake db:migrate
