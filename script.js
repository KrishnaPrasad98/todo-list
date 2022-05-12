$(document).ready(function ()
     {
          $("#projects").tabs();
          $("input [type=checkbox]").removeAttr("checked");
          $("ul").sortable({
               opacity: 0.5,
               distance: 0.5,
               axis: "x",
               // containment: "li"
          });
          $("ol").sortable({
               opacity: 0.5,
               distance: 0.5,
               axis: "y",
               // containment: "li"
          });

          $("input [type=checkbox]").removeAttr("checked");
          $("#projects").on("click", "input[type=checkbox]",  function(){
               $(this).closest("li").slideUp(function(){
                    $(this).remove();
               });
          });

          $("#btn-addproject").button().click(function()
          {
               $("#addproject-pop").dialog({height: 190, width: 400, resizable: false,
                    buttons:{"Add":function()
                                   {
                                        var addtitle = $("#newprotxt").val();
                                        var replace = addtitle.split(" ").join("_");
                                        $("<li><a href='#"+replace+"'>"+addtitle+"</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
                                        $("<ol id='"+replace+"'></ol>").appendTo("#projects").sortable({axis:"y"});
                                        $("#projects").tabs('refresh');
                                        var tabcount = $("projects ,ui-tabs-nav li").length;
                                        $("#projects").tabs("option", "active", tabcount-1);
                                        $("#newprotxt").val("");
                                        $(this).dialog('close');
                                   },
                              "Cancel":function()
                                   {
                                        $("#newprotxt").val("");
                                        $(this).dialog('close');
                                   }
                              }
               });                    
          });

          $("#btn-addtask").button().click(function()
          {
               $("#newtasktxt").val(" ");
               $("#addtask-pop").dialog({height: 190, width: 400, resizable: false,
                    buttons:{"Add":function()
                                   {
                                        $("#projects").tabs('refresh');
                                        var activetab = $("#projects").tabs("option","active");
                                        var title = $("#main > li:nth-child("+(activetab+1)+") > a").attr("href");
                                        $(title).append("<li><input type='checkbox'>"+$("#newtasktxt").val()+"</li>");
                                        $(this).dialog('close');
                                   },
                              "Cancel":function()
                                   {
                                        $("#newtasktxt").val("");
                                        $(this).dialog('close');
                                   }
                              }
               });                    
          });

          $("#projects").on("click", "span.ui-icon-close", function(){
                                                                 var index = $(this).closest("li").index();
                                                                 var id = $("#main li:eq("+index+") a").attr("href");
                                                                 $("#main li:eq("+index+") a").remove();
                                                                 $(id).remove();
                                                                 $(this).remove();
                                                                 $("#projects").tabs("refresh");
                                                            });
          });