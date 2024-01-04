class AppError extends Error{
    constructor(){
        super();
    }

    create(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        return this;
    }
}

module.exports = new AppError();