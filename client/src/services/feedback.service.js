import appFetch from "../utilities/appFetch"

const getFeedback = (username) =>
    appFetch("submission/feedbacks/" + username)

const createFeedback = (payload) => {
    const formData = new FormData()
    formData.append("data", JSON.stringify(payload.data))

    Array.from(payload.files).forEach((f) => {
        formData.append("pictures", f)
    })

    return appFetch("submission/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })
}

const replyToFeedback = (payload) =>
    appFetch("submission/feedback/" + payload.id, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })

export {
    getFeedback,
    createFeedback,
    replyToFeedback
}
