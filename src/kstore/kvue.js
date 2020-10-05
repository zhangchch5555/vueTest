let Vue

class Store {
    constructor(options = {}) {
        this.state = new Vue({
            data: options.state
        })
        this._mutations = options.mutations
        this._actions = options.actions
        this._getters = options.getters

        this.getters = {}
        this.setGetters()

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    commit(type) {
        const enter = this._mutations[type]
        if(!enter) {
            console.log(`unknown mutation type: ${type}`);
        }
        enter(this.state)
    }

    dispatch(type) {
        const enter = this._actions[type]
        if(!enter) {
            console.log(`unknown action type: ${type}`);
        }
        enter(this)
    }

    setGetters() {
        for(let key in this._getters) {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return this._getters[key](this.state)
                },
                enumerable: true
            })
        }
    }
}

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store, install}