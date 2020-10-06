let Vue

class Router {
    constructor(options = {}) {
        const initRouter = options.routes.find((item) => {
            return item.path === '/'
        })

        Vue.util.defineReactive(this, 'component', initRouter.component)

        window.addEventListener('hashchange', () => {
            let currentPath = window.location.hash.split(/#/)[1]
            const route = options.routes.find((item) => {
                return item.path === currentPath
            })
            this.component = route.component
        })
    }
}

Router.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
               Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            },
        },
        render(h) {
            // <a href=''>xxx</a>
            return h(
                'a',
                {attrs: {href: '#' + this.to}},
                this.$slots.default
            )
        }
    })

    Vue.component('router-view', {
        render(h) {
            let component = this.$router.component
            return h(component)
        }
    })
}

export default Router