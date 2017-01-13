function Ajax(__url)
{
    var _url = __url;
    var _type;
    var _data;

    this.data = setData;
    this.type = setType;
    this.send = sendAjax;

    function setType(__type) {
        _type = __type;
        return this;
    }

    function setData(__data) {
        _data = __data;
        return this;
    }

    function sendAjax(__success, __error) {
        $.ajax(
        {
            type: _type,
            url: _url ,
            data: _data ,
            success: function(result)
            {
                __success(result);
            },
            error: function(xhr, status, error)
            {
                __error(error);
            }
        });

        return this;
    }

}
