function server_log() {
    // clear some staff
    $(ID_INPUT_PRODUCT_CODE).css("background-color", "white");
    $(ID_WARNING).empty();

    block_screen(MSG_WAITING_SCR_MATCH_REQUEST);
    //url_score = getParameterByName(URL_PARAM_SCORE, window.location.href);
    $.ajax({
        type: "GET",
        /* url: URL_ROOT_API + "/fetchAjax/",*/
        url: URL_ROOT_API + "/fetchPGraph/",
        contentType: "application/json; charset=utf-8",
        data: {barcode: $(ID_INPUT_PRODUCT_CODE).val(),
            country: $(ID_INPUT_COUNTRY+" option:selected")[0].value,
            store: $(ID_INPUT_STORE+" option:selected")[0].value,
            score: $(ID_INPUT_SCORE_DB+" option:selected")[0].value},
        success: function (data) {
            unblock_screen();
            try {
                var product_ref = data.graph[0];
                var products_matching = data.graph[1];
                draw_page(product_ref, products_matching);
            } catch (e) {
                // possibly no data retrieved (product may have been excluded from search due to a lack of information (nutriments, etc.)
                $(ID_WARNING).empty();
                $(ID_WARNING).append(MSG_NO_DATA_RETRIEVED);
            }
        }
    });
}