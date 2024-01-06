import {selector} from 'recoil'
import { authState } from './authState'

export const userName = selector({
    key: 'userName',
    get: ({get}) => {
        const auth = get(authState);
        return auth.username
    }
})