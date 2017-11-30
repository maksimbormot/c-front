angular.module('Curve')
  .factory('SelectAll', function SelectAllFactory() {
    return{
      select: function(e) {
          var checked = false;
          if (e.target.checked){
            checked = true
          }
          console.log($(e.target).closest('table').find('input:checkbox'));
          $(e.target).closest('table').find('input:checkbox').prop("checked", checked)
      },
      deselect: function(e) {
        $(e.target).closest('.row-wrapper').find('.select-all').prop("checked", false);
      }
    }

  });
