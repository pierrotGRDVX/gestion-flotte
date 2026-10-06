import sqlite3
from flask import current_app, g

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES,)
        
        g.db.row_factory = sqlite3.Row
    print(g.db)
    return g.db

def save():
    g.db.commit()

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)

"""
def init_db():
    print("Resetting Database...")
    with current_app.open_resource('bdd/create_tables.sql') as c:
        get_db().executescript(c.read().decode('utf8'))
        print("TABLES CREATED")
    with current_app.open_resource('bdd/insert_data.sql') as i:
        get_db().executescript(i.read().decode('utf8'))
        print("DATA INSERTED")
"""