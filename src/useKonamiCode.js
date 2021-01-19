import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { inspect } from '@xstate/inspect';
import konamiCodeMachine from './konami-code-fsm';

inspect({
    url: 'https://statecharts.io/inspect',
    iframe: false
});

function useKonamiCode() {
    const [currentState, send] = useMachine(konamiCodeMachine, { devTools: true });

    useEffect(() => {
        const onKeyUp = (e) => send({
            type: 'KEYUP', keyName: getKeyName(e.keyCode)
        });

        // When a key is pressed send an event to the machine
        window.document.addEventListener('keyup', onKeyUp);

        // Cleanup event handler if hook is deregistered
        return () => window.document.removeEventListener('keyup', onKeyUp);
    }, [send]);

    useEffect(() => {
        if (currentState.matches('codeComplete')) {
            send({ type: 'RESET' });
        }
    }, [currentState, send]);

    return currentState.matches('codeComplete');
}

const getKeyName = (keyCode) => {
    return {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'A',
        66: 'B',
    }[keyCode];
};

export default useKonamiCode;