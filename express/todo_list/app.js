const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const date = require(__dirname + '/date.js');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("/todolistDB", { useNewUrlParser: true });

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

const defaultItem = [];
let day = date.getDate();

app.get('/', (req, res) => {
    res.redirect('/Home');
});

app.get('/:cutomListName', (req, res) => {
    let customListName =  _.capitalize(req.params.cutomListName);
    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                // create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItem
                });
                list.save();
                res.redirect('/' + customListName);
            } else {
                res.render('list', {
                    listTitle: foundList.name,
                    date: day,
                    newListItems: foundList.items
                });
            }
        }
    });
})


app.post('/', (req, res) => {
    const Name = req.body.newItem;
    const listName = req.body.titleList;

    const item = new Item({
        name: Name
    });

    List.findOne({ name: listName }, function (err, foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect('/' + listName);
    });
});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
        if (!err) {
            res.redirect('/' + listName)
        }
    })
});

app.listen(3000, () => {
    console.log('server started')
})