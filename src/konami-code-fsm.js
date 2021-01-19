import { Machine, actions } from 'xstate';

const {
  send,
  cancel,
  assign,
} = actions;

const konamiCodeMachine = Machine({
  id: 'konamiCode',
  initial: 'acceptingKeys',
  context: { keys: [] },
  states: {
    acceptingKeys: {
      exit: ['cancelDelayedReset'],
      on: {
        KEYUP: {
          target: 'keyEntered',
          actions: [
            'assignKey',
            'cancelDelayedReset',
            'sendDelayedReset'
          ]
        },
        RESET: {
          actions: ['resetKeys']
        }
      }
    },
    keyEntered: {
      always: [
        { target: 'codeComplete', cond: 'isCodeComplete' },
        { target: 'acceptingKeys' }
      ]
    },
    codeComplete: {
      on: {
        RESET: 'acceptingKeys'
      }
    }
  }
}, {
  actions: {
    assignKey: assign({
      keys: (context, event) => [...context.keys, event.keyName]
    }),
    resetKeys: assign({ keys: () => [] }),
    cancelDelayedReset: cancel('delayedReset'),
    sendDelayedReset: send('RESET', { delay: 3000, id: 'delayedReset' })
  },
  guards: {
    isCodeComplete: (context) => context.keys.join(' ') === 'up up down down left right left right B A'
  }
});

export default konamiCodeMachine;
