Requiremnts -
* create file .env.local in root of project
* fill required fields in .env.local (use example from .env.example)
* install nodejs
* install spacetimedb
* setup a spacetimedb account, or use a locally hosted spacetimedb instance. (recommend setting up account)
* run ``spacetime publish`` in terminal in the project
* setup Spacetimedb, Clerk and Openrouter account and get api keys for env.local
* setup clerk URL in spacetimedbs allowed issuer and audience list

Running the app -
1. ``npm install``
2. ``npm run spacetime:generate``
3. ``npm run build``
4. ``npm run start``
