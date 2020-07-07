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

const FilterByName = types
    .model("FilterByName", {
        FilterByName: ''
    })
    .actions(self => ({
        setFilterValue(e) {
            self.FilterByName = e
        }
    }))

const Store = types.model("Store", {
    PageID: types.array(PageID),
    FilterByName: types.array(FilterByName)
})

const AppStore = Store.create({
    PageID: [{}],
    FilterByName: [{}]
})

export default AppStore
