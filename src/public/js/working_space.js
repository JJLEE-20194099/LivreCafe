// handle confirm food-drink
const confirmFodr = $_1('#working-space .food-drink-confirm input[type=checkbox]')
const fodrSession = $_1('#working-space #food-drink-order')

confirmFodr.onchange = function (e) {
    if (e.target.checked) {
        fodrSession.classList.add('active')
    } else {
        fodrSession.classList.remove('active')
    }
}

//  pick foods and drinks
const fodrBtns = $$_1('#food-drink-order #ordering-nav .nav-item')

const foodBtn = $_1('#working-space #food-drink-order #food-btn')
const drinkBtn = $_1('#working-space #food-drink-order #drink-btn')

const divFoodList = $_1('#food-drink-order #ws-food-scroll')
const divDrinkList = $_1('#food-drink-order #ws-drink-scroll')
let activeFodrBtn = $_1('#food-drink-order #ordering-nav .nav-item.active')

let totalMoney = $_1('#ordered .fodr-total  span')

foodBtn.onclick = () => {
    activeFodrBtn = $_1('#food-drink-order #ordering-nav .nav-item.active')

    if (activeFodrBtn !== foodBtn) {
        activeFodrBtn.classList.remove('active')
        foodBtn.classList.add('active')

        divDrinkList.classList.remove('active')
        divFoodList.classList.add('active')
    }
}

drinkBtn.onclick = () => {

    activeFodrBtn = $_1('#food-drink-order #ordering-nav .nav-item.active')

    if (activeFodrBtn !== drinkBtn) {
        activeFodrBtn.classList.remove('active')
        drinkBtn.classList.add('active')

        divFoodList.classList.remove('active')
        divDrinkList.classList.add('active')
    }
}

const foodOrderingItems = $$_1("#food-drink-order #ws-food-scroll .fodr-item")
const drinkOrderingItems = $$_1("#food-drink-order #ws-drink-scroll .fodr-item")

let foodOrderedList = $_1('#food-drink-order #ordered #food-ordered')
let foodOrderedItems = $$_1('#food-drink-order #ordered #food-ordered .fodr-item')

let drinkOrderedList = $_1('#food-drink-order #ordered #drink-ordered')
let drinkOrderedItems = $$_1('#food-drink-order #ordered #drink-ordered .fodr-item')


// reset total money 

const resetTotalMoney = function () {
    let allOrderedRealItems = $$_1('#food-drink-order #ordered .fodr-item.active')
    let total = 0;
    allOrderedRealItems.forEach((item) => {
        total += parseInt(item.querySelector('.fodr-cost span').innerText.replaceAll('.', ''))
    })

    totalMoney.innerText = (new Intl.NumberFormat().format(total))

}


// handle add and remove food
foodOrderingItems.forEach((item, index) => {

    let input = item.querySelector("input")
    input.onchange = (e) => {

        const valueItem = parseInt(item.querySelector('.fodr-cost span').innerText.replaceAll('.', ''))
        if (e.target.checked === true) {
            foodOrderedItems[index].classList.add('active')
            resetTotalMoney()
        } else {
            foodOrderedItems[index].classList.remove('active')
            resetTotalMoney()
        }
    }
})

// handle add and remove drink
drinkOrderingItems.forEach((item, index) => {

    let input = item.querySelector("input")
    input.onchange = (e) => {
        const valueItem = parseInt(item.querySelector('.fodr-cost span').innerText.replaceAll('.', ''))
        if (e.target.checked === true) {
            drinkOrderedItems[index].classList.add('active')
            resetTotalMoney()
        } else {
            drinkOrderedItems[index].classList.remove('active')
            resetTotalMoney()
        }
    }
})

// toàn bộ các sản phẩm bên đã chọn, kể cả sản phẩm ko hiện lên (display :none) 
const allOrderedItems = $$_1('#food-drink-order #ordered .fodr-item')

// toàn bộ các sản phẩm bên đã chọn thực (được hiện lên)
let allOrderedRealItems = $$_1('#food-drink-order #ordered .fodr-item.active')


const resetValue = function (baseValue, number) {
    a = baseValue * number
    // return(new Intl.NumberFormat().format(a))
    return a;
}


// render picked item
allOrderedItems.forEach((item, index) => {
    const decreBtn = item.querySelector('#decre-btn')
    const increBtn = item.querySelector('#incre-btn')
    const input = item.querySelector('input')
    const costSpan = item.querySelector('.fodr-cost span')
    const baseValue = parseInt(costSpan.innerText.replaceAll('.', ''))
    const noFood = foodOrderedItems.length

    let oldValue = 0;

    decreBtn.onclick = function (e) {
        e.preventDefault()
        let a = parseInt(input.value)

        if (a > 1) {
            input.value = a - 1;
            costSpan.innerText = resetValue(baseValue, a - 1)
        } else {
            if (index < noFood) {
                foodOrderingItems[index].querySelector('input').checked = false
            } else {
                drinkOrderingItems[index - noFood].querySelector('input').checked = false
            }
            item.classList.remove('active')
        }
        resetTotalMoney()
    }

    increBtn.onclick = function (e) {
        e.preventDefault()
        let a = parseInt(input.value)
        input.value = a + 1;
        costSpan.innerText = resetValue(baseValue, a + 1)

        resetTotalMoney()

    }

    input.onfocus = (e) => {
        oldValue = e.target.value
    }

    input.onchange = (e) => {

        let a = parseInt(e.target.value)

        e.target.value = a

        if (Number.isInteger(a) && a > 0) {
            costSpan.innerText = resetValue(baseValue, a)
        } else {
            input.value = 1
            costSpan.innerText = resetValue(baseValue, 1)
        }
        resetTotalMoney()
    }

})

// const submitBtn = $_1('#working-space .submit-order button')

var avatar = ''

function uploadImage(e) {
    var e = e || window.event;
    var files = e.target.files;
    avatar = files[0];
}


$_1('#working-space .submit-order button').onclick = function (e) {
    e.preventDefault()

    if (!$_1('#basic-info .email input').value) {

        $_1('#noti-validate').innerHTML = 'Vui lòng nhập địa chỉ email';
        window.scrollTo(0, 0);
        return false;
    }

    if (!$_1('#basic-info .start-time input').value) {

        $_1('#noti-validate').innerHTML = 'Vui lòng nhập ngày và giờ bắt đầu sự kiện';
        window.scrollTo(0, 0);
        return false;
    }

    if (!$_1('#basic-info .end-time input ').value) {

        $_1('#noti-validate').innerHTML = 'Vui lòng nhập ngày và giờ kết thúc sự kiện';
        window.scrollTo(0, 0);
        return false;
    }

    

    var check = {
        username: $_1('#username').value,
        email: $_1('#basic-info .email input').value,
        eventBooker: $_1('#basic-info .name input').value,
        title: $_1('#basic-info .event-title input').value,
        no_seating: $_1('#basic-info .seat-num input').value,
        phone: $_1('#basic-info .phoneNum input').value,
        description: $_1('#basic-info .description textarea').value,
        eventStartDate: $_1('#basic-info .start-time input').value.substring(0, 10),
        eventStartTime: $_1('#basic-info .start-time input').value.substring(11, 17),
        eventEndDate: $_1('#basic-info .end-time input ').value.substring(0, 10),
        eventEndTime: $_1('#basic-info .end-time input ').value.substring(11, 17),
    }

    var eventStartTime = check.eventStartTime
    var eventStartDate = check.eventStartDate
    var eventEndTime = check.eventEndTime
    var eventEndDate = check.eventEndDate

    var minute_end = eventEndTime.split(":")[1]
    var hour_end = eventEndTime.split(":")[0]
    var second_end = 0
    var year_end = eventEndDate.split("-")[0]
    var month_end = eventEndDate.split("-")[1]
    var day_end = eventEndDate.split("-")[2]

    var minute_start = eventStartTime.split(":")[1]
    var hour_start = eventStartTime.split(":")[0]
    var second_start = 0
    var year_start = eventStartDate.split("-")[0]
    var month_start = eventStartDate.split("-")[1]
    var day_start = eventStartDate.split("-")[2]

    let datum = new Date(Date.UTC(year_end, month_end, day_end, hour_end, minute_end, second_end));
    var timestamp_end = datum.getTime()

    datum = new Date(Date.UTC(year_start, month_start, day_start, hour_start, minute_start, second_start));
    var timestamp_start = datum.getTime()

    var date_now = new Date()
    datum = new Date(Date.UTC(date_now.getFullYear().toString(), (date_now.getMonth() + 1).toString(), date_now.getDate().toString(), (date_now.getHours()).toString(), date_now.getMinutes().toString(), date_now.getSeconds().toString()));
    var timestamp_now = datum.getTime()

    if(timestamp_end <= timestamp_now) {
        $_1('#noti-validate').innerHTML = 'Thời gian kết thúc phải sau thời gian hiện tại';
        window.scrollTo(0, 0);
        return false;
    }

    if(timestamp_start - timestamp_now < 15 * 60 * 1000) {
        $_1('#noti-validate').innerHTML = 'Thời gian bắt đầu phải sau thời gian hiện tại 15 phút';
        window.scrollTo(0, 0);
        return false;
    }

    if(timestamp_end <= timestamp_start) {
        $_1('#noti-validate').innerHTML = 'Thời gian kết thúc phải sau thời gian bắt đầu';
        window.scrollTo(0, 0);
        return false;
    }

    if (!check.email) {

        $_1('#noti-validate').innerHTML = 'Vui lòng nhập địa chỉ email';
        window.scrollTo(0, 0);
        return false;
    }

    if (!check.title) {

        $_1('#noti-validate').innerHTML = 'Vui lòng nhập tên của sự kiện';
        window.scrollTo(0, 0);
        return false;
    }


    
    if (!check.eventBooker) {
        $_1('#noti-validate').innerHTML = 'Vui lòng nhập tên người đặt sự kiện';
        window.scrollTo(0, 0);
        return false;
    }

    

    if (!check.phone) {
        $_1('#noti-validate').innerHTML = 'Vui lòng nhập số điện thoại người đặt sự kiện';
        window.scrollTo(0, 0);
        return false;
    }

    

    if (check.username && check.email && check.eventBooker && check.title &&
        check.no_seating && check.phone && check.eventEndDate && check.eventStartDate &&
        check.eventStartTime && check.eventEndTime) {
        e.preventDefault();
        var allOrderedRealItems_food = $$_1('#food-ordered .fodr-item.active')
        var allOrderedRealItems_drink = $$_1('#drink-ordered .fodr-item.active')
        var foods = [];
        var drinks = [];


        allOrderedRealItems_food.forEach((item) => {
            let a = {
                food_id: item.querySelector('.fodr-id span').innerText,
                quantity: item.querySelector('.fodr-number input').value
            }
            foods.push(a)

        })

        allOrderedRealItems_drink.forEach((item) => {
            let a = {
                drink_id: item.querySelector('.fodr-id span').innerText,
                quantity: item.querySelector('.fodr-number input').value
            }
            drinks.push(a)

        })


        total_nums = $_1('#ordered .fodr-total span').innerText.replaceAll('.', '').split(',').join("")
        const dataWS = {
            username: $_1('#username').value,
            email: $_1('#basic-info .email input').value,
            eventBooker: $_1('#basic-info .name input').value,
            title: $_1('#basic-info .event-title input').value,
            no_seating: $_1('#basic-info .seat-num input').value,
            avatar: avatar,
            phone: $_1('.phoneNum input').value,
            description: $_1('#basic-info .description textarea').value,
            eventStartDate: $_1('#basic-info .start-time input').value.substring(0, 10),
            eventStartTime: $_1('#basic-info .start-time input').value.substring(11, 17),
            eventEndDate: $_1('#basic-info .end-time input ').value.substring(0, 10),
            eventEndTime: $_1('#basic-info .end-time input ').value.substring(11, 17),
            foods: foods,
            drinks: drinks,
            total: parseInt($_1('#ordered .fodr-total span').innerText.replaceAll('.', '').split(',').join(""))
        }

        var formData = new FormData()
        formData.append('username', dataWS.username)
        formData.append('email', dataWS.email)
        formData.append('eventBooker', dataWS.eventBooker)
        formData.append('title', dataWS.title)
        formData.append('no_seating', dataWS.no_seating)
        formData.append('avatar', dataWS.avatar)
        formData.append('phone', dataWS.phone)
        formData.append('description', dataWS.description)
        formData.append('eventStartDate', dataWS.eventStartDate)
        formData.append('eventStartTime', dataWS.eventStartTime)
        formData.append('eventEndDate', dataWS.eventEndDate)
        formData.append('eventEndTime', dataWS.eventEndTime)
        for (var food of foods) {
            formData.append(food.food_id, food.quantity)

        }
        for (var drink of drinks) {
            formData.append(drink.drink_id, drink.quantity)

        }
        formData.append('split', foods.length)
        formData.append('total', dataWS.total)



        $(document).ready(function () {
            $.ajax({
                url: "/workingspaces/save",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log(res)
                    if (res["check"])
                        window.location.href = `/workingspaces/${res["wk"].slug}`;
                    else {
                        $("#notice").html(`<button  id="notice-btn" type="button" class="btn btn-danger" data-toggle="modal" data-target="#form" style="display: none"> See Modal with Form </button>
                                                <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content py-md-5 px-md-4 p-sm-3 p-4" style="background-color: #837542; box-shadow: 0 4px 8px 0 rgb(0, 0, 0 / 20%), 0 6px 20px 0 rgb(34, 2, 2);">
                                                            <h5 style="text-align: center; margin-bottom: 12px; color: #a2ddfd">Bạn chỉ có thể đặt tối đa số lượng ${res["item"].quantity} sản phẩm <a href="/${res["type"]}/${res["item"].slug}" style="color: #8daee1;">${res["item"].name}</a></h5>
                                                            <h5 style="text-align: center; color: #a2ddfd">Xin lỗi bạn vì sự bất tiện này</h5>
                                                            <div class="d-flex align-items-center justify-content-center">
                                                            <img src="/img/sorry.png" style="text-align: center; color: #b78908; box-shadow: 0 4px 8px 0 rgb(0, 0, 0 / 20%), 0 6px 20px 0 rgb(34, 2, 2); height: 300px; width: 300px" class="" />
                                                            </div>
                                                            <p class="r3 px-md-5 px-sm-1" style="text-align: center">Bạn hãy đặt thêm những đồ ăn thức uống khác nhé</p>
                                                            <div class="text-center mb-3"> <button id="continue" class="btn w-50 rounded-pill b1" style="background-color: #8daee1">Tiếp tục đặt</button> </div>
                                                        </div>
                                                    </div>
                                                </div>`)

                        $("#notice-btn").click()
                        $("#continue").click(function () {
                            $("#form").click()
                        })

                    }
                }
            })
        })


    }


}