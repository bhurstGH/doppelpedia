module.exports = class ApplicationPolicy {
    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isOwner() {
        return this.record && (this.record.userId == this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isPremium() {
        return this.user && this.user.role == "premium";
    }

    isMember() {
        return this.user != null;
    }

    create() {
        return this.isMember();
    }

    createPrivate() {
        return this._isPremium();
    }

    show() {
        return true;
    }

    edit() {
        return this.isMember() && this.record;
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.edit();
    }
    
}