function addToCart(id, name, price) {
    fetch('/api/cart', {
        method: "post",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "price": price
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        let items = document.getElementsByClassName('cart-counter');
        for (let item of items)
            item.innerText = data.total_quantity;
    });
}

function updateCart(id, obj) {
    obj.disabled = true;
    fetch(`/api/cart/${id}`, {
        method: "put",
        body: JSON.stringify({
            "quantity": obj.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        obj.disabled = false;
        let items = document.getElementsByClassName('cart-counter');
        for (let item of items)
            item.innerText = data.total_quantity;
    });
}

function deleteCart(id, obj) {
    if (confirm("Ban chac chan xoa khong?") === true) {
        fetch(`/api/cart/${id}`, {
            method: "delete"
        }).then(function(res) {
            return res.json();
        }).then(function(data) {
            obj.disabled = false;
            let items = document.getElementsByClassName('cart-counter');
            for (let item of items)
                item.innerText = data.total_quantity;

            let d = document.getElementById(`product${id}`);
            d.style.display = "none";
        });
    }
}