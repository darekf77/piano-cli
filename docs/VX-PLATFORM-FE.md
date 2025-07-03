1. clone https://gitlab.com/piano/vx/vx-dashboard

2. setup .npmrc
```
registry=https://nexus.piano.io/repository/npm-piano/
//nexus.piano.io/repository/npm-piano/:email=YOUR_EMAIL
//nexus.piano.io/repository/npm-piano/:_auth=YOUR_AUTH_TOKEN
//nexus.piano.io/repository/npm-vx:email=YOUR_EMAIL
//nexus.piano.io/repository/npm-vx/:_auth=YOUR_AUTH_TOKEN
@sdk:registry=https://nexus.piano.io/repository/npm-piano/
@piano-dc:registry=https://nexus.piano.io/repository/npm-piano/
always-auth=true
```

After receving password/username from devops execture:
```
echo -n "username:password" | openssl base64
```
to get **YOUR_AUTH_TOKEN** value

3. setup path to your https serts in apps/admin/project.json and apps/publisher/project.json
for instance:
"sslKey": "./ssl/piano-key.key",
"sslCert": "./ssl/piano-cert.pem",

4. from root npm i --legacy-peer-deps

5. In VX backend project add to dev/overrides.properties

```bash
static.assets.pub_dash.multilang=false
static.assets.pub_dash.base_url=https://127.0.0.1:3002/
static.assets.admin_dash.base_url=https://127.0.0.1:3001/ 
```
disable if you don't need admin part(to disable add # before prop, for instance #static.assets.admin_dash.base_url=https://127.0.0.1:3001/)

6. run admin and publish apps nx serve admin and nx serve publisher






3:05
if you don't have creds for nexus(npmrc) you need to ask your manager to request them from devops team
3:07
for ssl you can use the same cert which you use for VX project or create self signed
