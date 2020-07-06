import { types } from "mobx-state-tree"

const PageID = types
    .model("PageID", {
        PageID: 1
    })
    .actions(self => ({
        setPage(e) {
            self.PageID = e
        }
    }))

const Store = types.model("Store", {
    PageID: types.array(PageID)
})

const AppStore = Store.create({
    PageID: [{}]
})

export default AppStore
