import { createTransform } from 'redux-persist';
import { AuthState, initialState } from '../slices/auth/authSlice.ts';

export const authTransform = createTransform<AuthState, Partial<AuthState>>(
  (inboundState: AuthState) => ({
    accessToken: inboundState.accessToken,
  }),
  (outboundState: Partial<AuthState> | undefined) => {
    const state = outboundState ?? {};
    return {
      ...initialState,
      accessToken: state.accessToken ?? null,
      user: null,
      isAuth: !!state.accessToken,
      loading: false,
      error: null,
    };
  },
  { whitelist: ['auth'] }
);
