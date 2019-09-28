# 0x5f3759df

### Как пользоваться services/travels/custom.js, чтобы оно вас не сожрало

Код лучше не смотреть, потому что там всё плохо. 

Что я возвращаю:

```
const flight = (origin, destination, depart, returnn, price, airline, number) => {
    return {
        "origin" : origin,
        "destination" : destination,
        "depart" : depart, 
        "return" : returnn, 
        "price" : price,
        "airline" : airline, 
        "number" : number
    }
}

const hotel = (id, place, checkIn, checkOut, price, stars) => {
    return {
        "id" : id, 
        "place" : place, 
        "checkIn" : checkIn, 
        "checkOut" : checkOut, 
        "price" : price, 
        "stars" : stars
    }
}

const bind = (hotels, flight) => {
    return {
        "flight" : flight, 
        "hotels" : hotels
    }
}
```

Вот я возвращаю массив из bind