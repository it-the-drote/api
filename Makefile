GOC := /usr/bin/go build
FETCHLIBS=/usr/bin/go get

SRCDIR=src/apps-api
BUILDDIR=/home/apps/bin
LIBDIR=/home/apps/golibs

INSTALL=install
INSTALL_BIN=$(INSTALL) -m755
INSTALL_CONF=$(INSTALL) -m644

PREFIX?=$(DESTDIR)/usr
OPTDIR?=$(DESTDIR)/opt/apps-api
BINDIR?=$(PREFIX)/bin
SHAREDIR?=$(PREFIX)/share/apps-api
DATASOURCESDIR?=$(DESTDIR)/etc/datasources
HOSTSDROPINSDIR?=$(DESTDIR)/etc/hosts.d
NGINXCONFDIR?=$(DESTDIR)/etc/nginx/sites-available
SYSTEMDCONFDIR?=$(DESTDIR)/lib/systemd/system
RSYSLOGCONFDIR?=$(DESTDIR)/etc/rsyslog.d

all: apps-api

apps-api: Makefile src/apps-api/main.go
	export GOPATH=$(LIBDIR) && \
	export GOBIN=$(BUILDDIR) && \
	cd $(SRCDIR) && \
	$(FETCHLIBS) && \
	$(GOC)

clean:
	rm -f src/apps-api/apps-api

install:
	mkdir -p $(BINDIR)
	mkdir -p $(SHAREDIR)
	mkdir -p $(NGINXCONFDIR)
	mkdir -p $(SYSTEMDCONFDIR)
	mkdir -p $(RSYSLOGCONFDIR)
	mkdir -p $(OPTDIR)
	mkdir -p $(DATASOURCESDIR)
	mkdir -p $(HOSTSDROPINSDIR)
	$(INSTALL_BIN) src/apps-api/apps-api $(BINDIR)/
	$(INSTALL_BIN) src/python-middleware/duolingo-api.py $(BINDIR)/
	cp -R src/static $(SHAREDIR)/
	cp -R src/server/* $(OPTDIR)/
	$(INSTALL_CONF) src/nginx/apps-api.nginx $(NGINXCONFDIR)/
	$(INSTALL_CONF) src/init/apps-api.service $(SYSTEMDCONFDIR)/
	$(INSTALL_CONF) src/rsyslog/00-apps-api.conf $(RSYSLOGCONFDIR)/
	$(INSTALL_CONF) src/config/apps-api.json $(DATASOURCESDIR)/
	$(INSTALL_CONF) src/hosts/10-apps-api.conf $(HOSTSDROPINSDIR)/
