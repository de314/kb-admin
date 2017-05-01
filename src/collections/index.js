import React from 'react';
import kb from 'kb-ui';
import uuid from 'uuid';

const testSupplier = kb.suppliers.mem([
  { id: "0", name: 'David P', email: 'david@test.com', suspended: false },
  { id: "1", name: 'David H', email: 'david.h@test.com', suspended: false },
  { id: "2", name: 'David E', email: 'david.e@test.com', suspended: false },
  { id: "3", name: 'Mark O', email: 'mark.o@test.com', suspended: true },
  { id: "4", name: 'Mark J ', email: 'mark.j@test.com', suspended: false },
  { id: "5", name: 'Mark T', email: 'mark.t@test.com', suspended: false },
  { id: "6", name: 'Jeff Y', email: 'jeff.y@test.com', suspended: false },
])

const test = kb.collection(testSupplier)
    .singular('User')
    .plural('Users')
    .slug('users')
    .list(
      kb.view().fields([
        kb.field('id'),
        kb.field('name'),
        kb.field('email')
      ])
    )
    .create(
      kb.form().fields([
        kb.field('id').readOnly(true).defaultValue(uuid).raw(true).render((val) => (
          <span className="text-muted"><em>{val}</em></span>
        )),
        kb.field('name'),
        kb.field('email')
      ])
    )
    .details(
      kb.view().fields([
        kb.field('name').raw(true).render(val => (<h2>{val}</h2>)),
        kb.field('email').raw(true).render(val => (
          <div className="user-avatar">
            <img src={`https://robohash.org/${val}?size=64x64`} className="img-thumbnail" style={{ width: '64px', height: '64px' }}/>
          </div>
        )),
        kb.field('id').render(val => (<div className="text-muted"><em>{val}</em></div>)),
        kb.field('email')
      ])
    )
    .edit(
      kb.form().fields([
        kb.field('name'),
        kb.field('email')
      ])
    );



const collections = {
  test
};

export default collections;
