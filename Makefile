GOC := /usr/bin/go build
FETCHLIBS=/usr/bin/go get

SRCDIR=src/server/apps-api
BUILDDIR=/home/apps/bin
LIBDIR=/home/apps/golibs

INSTALL=install
INSTALL_BIN=$(INSTALL) -m755
INSTALL_CONF=$(INSTALL) -m644

PREFIX?=$(DESTDIR)/usr
BINDIR?=$(PREFIX)/bin
SHAREDIR?=$(PREFIX)/share/apps-api
NGINXCONFDIR?=$(DESTDIR)/etc/nginx/sites-available
SYSTEMDCONFDIR?=$(DESTDIR)/lib/systemd/system
RSYSLOGCONFDIR?=$(DESTDIR)/etc/rsyslog.d

all: apps-api

apps-api: Makefile src/server/apps-api/main.go
	export GOPATH=$(LIBDIR) && \
	export GOBIN=$(BUILDDIR) && \
	cd $(SRCDIR) && \
	$(FETCHLIBS) && \
	$(GOC)

clean:
	rm -f src/server/apps-anker/apps-api

install:
	mkdir -p $(BINDIR)
	mkdir -p $(SHAREDIR)
	mkdir -p $(NGINXCONFDIR)
	mkdir -p $(SYSTEMDCONFDIR)
	mkdir -p $(RSYSLOGCONFDIR)
	$(INSTALL_BIN) src/server/apps-api/apps-api $(BINDIR)/
	$(INSTALL_BIN) src/server/python-middleware/duolingo-api.py $(BINDIR)/
	cp -R src/static $(SHAREDIR)/
	$(INSTALL_CONF) src/server/nginx/apps-api.nginx $(NGINXCONFDIR)/
	$(INSTALL_CONF) src/server/init/apps-api.service $(SYSTEMDCONFDIR)/
	$(INSTALL_CONF) src/server/rsyslog/00-apps-api.conf $(RSYSLOGCONFDIR)/
