import { e as effectScope, r as ref, m as markRaw, t as toRaw, i as isRef, a as isReactive, b as toRef, c as inject, w as watch, d as reactive, g as getCurrentInstance, o as onUnmounted, n as nextTick, f as toRefs, h as computed } from './common/runtime-core.esm-bundler-0fde8a87.js';

var isVue2 = false;

/*!
  * pinia v2.0.11
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */

/**
 * setActivePinia must be called to handle SSR at the top of functions like
 * `fetch`, `setup`, `serverPrefetch` and others
 */
let activePinia;
/**
 * Sets or unsets the active pinia. Used in SSR and internally when calling
 * actions and getters
 *
 * @param pinia - Pinia instance
 */
const setActivePinia = (pinia) => (activePinia = pinia);
const piniaSymbol = ( /* istanbul ignore next */ Symbol());

function isPlainObject(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
o) {
    return (o &&
        typeof o === 'object' &&
        Object.prototype.toString.call(o) === '[object Object]' &&
        typeof o.toJSON !== 'function');
}
// type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
// TODO: can we change these to numbers?
/**
 * Possible types for SubscriptionCallback
 */
var MutationType;
(function (MutationType) {
    /**
     * Direct mutation of the state:
     *
     * - `store.name = 'new name'`
     * - `store.$state.name = 'new name'`
     * - `store.list.push('new item')`
     */
    MutationType["direct"] = "direct";
    /**
     * Mutated the state with `$patch` and an object
     *
     * - `store.$patch({ name: 'newName' })`
     */
    MutationType["patchObject"] = "patch object";
    /**
     * Mutated the state with `$patch` and a function
     *
     * - `store.$patch(state => state.name = 'newName')`
     */
    MutationType["patchFunction"] = "patch function";
    // maybe reset? for $state = {} and $reset
})(MutationType || (MutationType = {}));

/**
 * Creates a Pinia instance to be used by the application
 */
function createPinia() {
    const scope = effectScope(true);
    // NOTE: here we could check the window object for a state and directly set it
    // if there is anything like it with Vue 3 SSR
    const state = scope.run(() => ref({}));
    let _p = [];
    // plugins added before calling app.use(pinia)
    let toBeInstalled = [];
    const pinia = markRaw({
        install(app) {
            // this allows calling useStore() outside of a component setup after
            // installing pinia's plugin
            setActivePinia(pinia);
            {
                pinia._a = app;
                app.provide(piniaSymbol, pinia);
                app.config.globalProperties.$pinia = pinia;
                toBeInstalled.forEach((plugin) => _p.push(plugin));
                toBeInstalled = [];
            }
        },
        use(plugin) {
            if (!this._a && !isVue2) {
                toBeInstalled.push(plugin);
            }
            else {
                _p.push(plugin);
            }
            return this;
        },
        _p,
        // it's actually undefined here
        // @ts-expect-error
        _a: null,
        _e: scope,
        _s: new Map(),
        state,
    });
    return pinia;
}

const noop = () => { };
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
        const idx = subscriptions.indexOf(callback);
        if (idx > -1) {
            subscriptions.splice(idx, 1);
            onCleanup();
        }
    };
    if (!detached && getCurrentInstance()) {
        onUnmounted(removeSubscription);
    }
    return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
        callback(...args);
    });
}

function mergeReactiveObjects(target, patchToApply) {
    // no need to go through symbols because they cannot be serialized anyway
    for (const key in patchToApply) {
        const subPatch = patchToApply[key];
        const targetValue = target[key];
        if (isPlainObject(targetValue) &&
            isPlainObject(subPatch) &&
            !isRef(subPatch) &&
            !isReactive(subPatch)) {
            target[key] = mergeReactiveObjects(targetValue, subPatch);
        }
        else {
            // @ts-expect-error: subPatch is a valid value
            target[key] = subPatch;
        }
    }
    return target;
}
const skipHydrateSymbol =  /* istanbul ignore next */ Symbol();
function shouldHydrate(obj) {
    return  !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
    return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
        if (!initialState && (!("production" !== 'production') )) {
            /* istanbul ignore if */
            {
                pinia.state.value[id] = state ? state() : {};
            }
        }
        // avoid creating a state in pinia.state.value
        const localState =  toRefs(pinia.state.value[id]);
        return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = markRaw(computed(() => {
                setActivePinia(pinia);
                // it was created just before
                const store = pinia._s.get(id);
                // @ts-expect-error
                // return getters![name].call(context, context)
                // TODO: avoid reading the getter while assigning with a global variable
                return getters[name].call(store, store);
            }));
            return computedGetters;
        }, {}));
    }
    store = createSetupStore(id, setup, options, pinia);
    store.$reset = function $reset() {
        const newState = state ? state() : {};
        // we use a patch to group all changes into one single subscription
        this.$patch(($state) => {
            assign($state, newState);
        });
    };
    return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot) {
    let scope;
    const buildState = options.state;
    const optionsForPlugin = assign({ actions: {} }, options);
    // watcher options for $subscribe
    const $subscribeOptions = {
        deep: true,
        // flush: 'post',
    };
    // internal state
    let isListening; // set to true at the end
    let isSyncListening; // set to true at the end
    let subscriptions = markRaw([]);
    let actionSubscriptions = markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    // avoid setting the state for option stores are it is set
    // by the setup
    if (!buildState && !initialState && (!("production" !== 'production') )) {
        /* istanbul ignore if */
        {
            pinia.state.value[$id] = {};
        }
    }
    const hotState = ref({});
    function $patch(partialStateOrMutator) {
        let subscriptionMutation;
        isListening = isSyncListening = false;
        if (typeof partialStateOrMutator === 'function') {
            partialStateOrMutator(pinia.state.value[$id]);
            subscriptionMutation = {
                type: MutationType.patchFunction,
                storeId: $id,
                events: debuggerEvents,
            };
        }
        else {
            mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
            subscriptionMutation = {
                type: MutationType.patchObject,
                payload: partialStateOrMutator,
                storeId: $id,
                events: debuggerEvents,
            };
        }
        nextTick().then(() => {
            isListening = true;
        });
        isSyncListening = true;
        // because we paused the watcher, we need to manually call the subscriptions
        triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    /* istanbul ignore next */
    const $reset =  noop;
    function $dispose() {
        scope.stop();
        subscriptions = [];
        actionSubscriptions = [];
        pinia._s.delete($id);
    }
    /**
     * Wraps an action to handle subscriptions.
     *
     * @param name - name of the action
     * @param action - action to wrap
     * @returns a wrapped action to handle subscriptions
     */
    function wrapAction(name, action) {
        return function () {
            setActivePinia(pinia);
            const args = Array.from(arguments);
            const afterCallbackList = [];
            const onErrorCallbackList = [];
            function after(callback) {
                afterCallbackList.push(callback);
            }
            function onError(callback) {
                onErrorCallbackList.push(callback);
            }
            // @ts-expect-error
            triggerSubscriptions(actionSubscriptions, {
                args,
                name,
                store,
                after,
                onError,
            });
            let ret;
            try {
                ret = action.apply(this && this.$id === $id ? this : store, args);
                // handle sync errors
            }
            catch (error) {
                triggerSubscriptions(onErrorCallbackList, error);
                throw error;
            }
            if (ret instanceof Promise) {
                return ret
                    .then((value) => {
                    triggerSubscriptions(afterCallbackList, value);
                    return value;
                })
                    .catch((error) => {
                    triggerSubscriptions(onErrorCallbackList, error);
                    return Promise.reject(error);
                });
            }
            // allow the afterCallback to override the return value
            triggerSubscriptions(afterCallbackList, ret);
            return ret;
        };
    }
    const partialStore = {
        _p: pinia,
        // _s: scope,
        $id,
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $patch,
        $reset,
        $subscribe(callback, options = {}) {
            const removeSubscription = addSubscription(subscriptions, callback, options.detached, () => stopWatcher());
            const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
                if (options.flush === 'sync' ? isSyncListening : isListening) {
                    callback({
                        storeId: $id,
                        type: MutationType.direct,
                        events: debuggerEvents,
                    }, state);
                }
            }, assign({}, $subscribeOptions, options)));
            return removeSubscription;
        },
        $dispose,
    };
    const store = reactive(assign( {}, partialStore
    // must be added later
    // setupStore
    ));
    // store the partial store now so the setup of stores can instantiate each other before they are finished without
    // creating infinite loops.
    pinia._s.set($id, store);
    // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
    const setupStore = pinia._e.run(() => {
        scope = effectScope();
        return scope.run(() => setup());
    });
    // overwrite existing actions to support $onAction
    for (const key in setupStore) {
        const prop = setupStore[key];
        if ((isRef(prop) && !isComputed(prop)) || isReactive(prop)) {
            // mark it as a piece of state to be serialized
            if (!buildState) {
                // in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
                if (initialState && shouldHydrate(prop)) {
                    if (isRef(prop)) {
                        prop.value = initialState[key];
                    }
                    else {
                        // probably a reactive object, lets recursively assign
                        mergeReactiveObjects(prop, initialState[key]);
                    }
                }
                // transfer the ref to the pinia state to keep everything in sync
                /* istanbul ignore if */
                {
                    pinia.state.value[$id][key] = prop;
                }
            }
            // action
        }
        else if (typeof prop === 'function') {
            // @ts-expect-error: we are overriding the function we avoid wrapping if
            const actionValue =  wrapAction(key, prop);
            // this a hot module replacement store because the hotUpdate method needs
            // to do it with the right context
            /* istanbul ignore if */
            {
                // @ts-expect-error
                setupStore[key] = actionValue;
            }
            // list actions so they can be used in plugins
            // @ts-expect-error
            optionsForPlugin.actions[key] = prop;
        }
        else ;
    }
    // add the state, getters, and action properties
    /* istanbul ignore if */
    {
        assign(store, setupStore);
        // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
        // Make `storeToRefs()` work with `reactive()` #799
        assign(toRaw(store), setupStore);
    }
    // use this instead of a computed with setter to be able to create it anywhere
    // without linking the computed lifespan to wherever the store is first
    // created.
    Object.defineProperty(store, '$state', {
        get: () => ( pinia.state.value[$id]),
        set: (state) => {
            $patch(($state) => {
                assign($state, state);
            });
        },
    });
    // apply all plugins
    pinia._p.forEach((extender) => {
        /* istanbul ignore else */
        {
            assign(store, scope.run(() => extender({
                store,
                app: pinia._a,
                pinia,
                options: optionsForPlugin,
            })));
        }
    });
    // only apply hydrate to option stores with an initial state in pinia
    if (initialState &&
        buildState &&
        options.hydrate) {
        options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
}
function defineStore(
// TODO: add proper types from above
idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === 'function';
    if (typeof idOrOptions === 'string') {
        id = idOrOptions;
        // the option store setup will contain the actual options in this case
        options = isSetupStore ? setupOptions : setup;
    }
    else {
        options = idOrOptions;
        id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
        const currentInstance = getCurrentInstance();
        pinia =
            // in test mode, ignore the argument provided as we can always retrieve a
            // pinia instance with getActivePinia()
            ( pinia) ||
                (currentInstance && inject(piniaSymbol));
        if (pinia)
            setActivePinia(pinia);
        pinia = activePinia;
        if (!pinia._s.has(id)) {
            // creating the store registers it in `pinia._s`
            if (isSetupStore) {
                createSetupStore(id, setup, options, pinia);
            }
            else {
                createOptionsStore(id, options, pinia);
            }
        }
        const store = pinia._s.get(id);
        // StoreGeneric cannot be casted towards Store
        return store;
    }
    useStore.$id = id;
    return useStore;
}

/**
 * Creates an object of references with all the state, getters, and plugin-added
 * state properties of the store. Similar to `toRefs()` but specifically
 * designed for Pinia stores so methods and non reactive properties are
 * completely ignored.
 *
 * @param store - store to extract the refs from
 */
function storeToRefs(store) {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
        const value = store[key];
        if (isRef(value) || isReactive(value)) {
            // @ts-expect-error: the key is state or getter
            refs[key] =
                // ---
                toRef(store, key);
        }
    }
    return refs;
}

export { createPinia, defineStore, storeToRefs };
