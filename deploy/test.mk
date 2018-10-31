test:
	@echo " ### TESTING CODE\n---\n"
	$(SSH) sudo /usr/sbin/nginx -t
	@echo "---\n"
