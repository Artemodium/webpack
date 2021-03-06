$('.dropdown-default__content_default').show();
$('.dropdown-large__content_large').show();
$('.show-hint').hide()

let ExpandableClassListLarge = ['field__text-field_large-expandable',
    'text-field__placeholder',
    'text-field__placeholder-checkmark',
    'text-field__chekmark',
    'text-field__placeholder-text'
]
let ExpandableClassListDefault = ['field__text-field_default-expandable',
    'text-field__placeholder',
    'text-field__placeholder-checkmark',
    'text-field__chekmark',
    'text-field__placeholder-text'
]

$('.dropdown-default__content_default').is(':visible') ?
    $('.field__text-field_default-expandable').css('border', '1px solid rgba(31, 32, 65, 0.5)') :
    $('.field__text-field_default-expandable').css('border', '1px solid rgba(31, 32, 65, 0.25)')

$('.dropdown-large__content_large').is(':visible') ?
    $('.field__text-field_large-expandable').css('border', '1px solid rgba(31, 32, 65, 0.5)') :
    $('.field__text-field_large-expandable').css('border', '1px solid rgba(31, 32, 65, 0.25)')

$('.dropdown-default__field-and-content').on('click', function(e) {
    let expand = $('.dropdown-default__content_default', this)
    let textField = $('.field__text-field_default-expandable', this)
    if (ExpandableClassListDefault.includes(e.target.className))
        expand.is(':hidden') ?
        expand.fadeIn() &&
        textField.css('border', '1px solid rgba(31, 32, 65, 0.5)') :
        expand.fadeOut() &&
        textField.css('border', '1px solid rgba(31, 32, 65, 0.25)')
})

$('.dropdown-large__field-and-content').on('click', function(e) {
    let expand = $('.dropdown-large__content_large', this)
    let textField = $('.field__text-field_large-expandable', this)
    if (ExpandableClassListLarge.includes(e.target.className))
        expand.is(':hidden') ?
        expand.fadeIn() &&
        textField.css({ 'border': '1px solid rgba(31, 32, 65, 0.5)' }) :
        expand.fadeOut() &&
        textField.css({ 'border': '1px solid rgba(31, 32, 65, 0.25)' })
})

$('.item__count').on('click', function(e) {
    let count = parseInt($('.item__key', this).text())
    if (['count__minus-symb', 'count__minus'].includes(e.target.className) && count > 0) {
        count -= 1
        $('.item__key', this).text(count)
    } else if (['count__plus-symb', 'count__plus'].includes(e.target.className)) {
        count += 1
        $('.item__key', this).text(count)
    }
})

if ($(location).attr('pathname') == '/form-elements.html') {
    $('.dropdown-large').on('click', function(e) {
        if (['button__placeholder_color-font clear'].includes(e.target.className)) {
            $(this).find('.item__key').text(0)
        }
        let str = $(this).find('.content__item').text()
        str = str.split('+')
        names = str.map(i => i.slice(0, i.indexOf('-')))
        counts = str.map(i => i.slice(i.indexOf('-') + 1))
        let guests = {}
        names.forEach((key, i) => guests[key] = counts[i])
        count = Object.values(guests).map(i => parseInt(i)).filter(val => !Number.isNaN(val))
        count = count.reduce((summ, curr) => summ + curr)
        if (count === 0)
            $(this).find('.text-field__placeholder-text').text('?????????????? ????????????')
        else if (('' + count).slice(-1) === '1' && ('' + count).slice(-2) !== '11')
            $(this).find('.text-field__placeholder-text').text(`${count} ??????????`)
        else if (['2', '3', '4'].includes(('' + count).slice(-1)) && !(['12', '13', '14'].includes('' + count)) && !(['11', '12', '13', '14'].includes(('' + count).slice(-2))))
            $(this).find('.text-field__placeholder-text').text(`${count} ??????????`)
        else
            $(this).find('.text-field__placeholder-text').text(`${count} ????????????`)
    })
}


$('.dropdown-default').on('click', function(e) {
    if (['button__placeholder_color-font'].includes(e.target.className)) {
        $(this).find('.item__key').text(0)
    }
    let str = $(this).find('.content__item').text()
    str = str.split('+')
    names = str.map(i => i.slice(0, i.indexOf('-')))
    counts = str.map(i => i.slice(i.indexOf('-') + 1))
    let rooms = {}
    names.forEach((key, i) => {
        if (counts[i] != '')
            rooms[key] = counts[i]
    })

    let bedrooms
    let beds
    let baths

    if (rooms['??????????????'] == 1) {
        bedrooms = '??????????????'
    } else if (['2', '3', '4'].includes(rooms['??????????????'])) {
        bedrooms = '??????????????'
    } else {
        bedrooms = '????????????'
    }
    if (rooms['??????????????'] == 1) {
        beds = '??????????????'
    } else if (['2', '3', '4'].includes(rooms['??????????????'])) {
        beds = '??????????????'
    } else {
        beds = '????????????????'
    }
    if (rooms['???????????? ??????????????'] == 1) {
        baths = '???????????? ??????????????'
    } else if (['2', '3', '4'].includes(rooms['???????????? ??????????????'])) {
        baths = '???????????? ??????????????'
    } else {
        baths = '???????????? ????????????'
    }

    $(this).find('.text-field__placeholder-text').text(`${rooms['??????????????']} ${bedrooms}, ${rooms['??????????????']} ${beds}...`)
    $(this).find('.bedrooms').text(`${rooms['??????????????']} ${bedrooms},`)
    $(this).find('.beds').text(`${rooms['??????????????']} ${beds},`)
    $(this).find('.baths').text(`${rooms['???????????? ??????????????']} ${baths}`)
})

$('.dropdown-default__field').mouseover(function() {
    $(this).find('.baths').text() != '' ? $('.show-hint', this).show() : ''
}).mouseout(function() {
    $('.show-hint', this).hide()
})