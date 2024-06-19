import { fetchCreateTrade } from "../../redux/trades"
import "./UsersTradeableItems.css"

function UsersTradeableItems ({items, itemId}) {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("buyerItemId", name)
        formData.append("sellerItemId", isPrivate)

        const serverResponse = await dispatch(
          fetchCreateList(formData)
        )
        if (serverResponse) {
          setErrors(serverResponse)
        } else {
          navigate('/')
        }
      }

    // const handleSubmit = (usersItemId) => {
    //     {
    //         "buyerItemId": 3,
    //         "sellerItemId": 4
    //     }
    // }

    return (
        items.map(item => {
            return(
                <div key={item.itemId}
                onClick={handleSubmit(item.itemId)}>
                    {item.title}
                </div>
            )
        })
    )
}

export default UsersTradeableItems
