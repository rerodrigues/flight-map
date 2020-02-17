import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import { AppState } from '../store';

const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

export default useSelector;
