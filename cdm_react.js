var TableRows = React.createClass({
    render: function() {
        var tableRows = this.props.data.map(function (row) {
            return (
              <div  key={row.id2}>
                {row.id2} - {row.name2}
              </div>
            );
        });
        return (
          <div>
            {tableRows}
          </div>
      );
    }
});

var Table = React.createClass({
    loadDataFromServer: function() {

        $.ajax({
            type: "GET",
            url: this.props.url,
            username: 'sa',
            password: 'jacques1#',
            crossDomain : true,
            xhrFields: {
                withCredentials: true
            }, 
            success: function( data ) {
               console.log("done");
        var xmlData = $.xml2json(data);
        this.setState({data: $.xml2json(data)["dbo.Table2"]});
        //this.state.data = xmlData;
            }.bind(this),

            error:  function(xhr, textStatus, errorThrown) {
                alert(xhr.responseText + textStatus);
            }.bind(this)
        })
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadDataFromServer();
    },
    render: function() {
        return (
          <div>
           {this.state.data.length} 
            <TableRows data={this.state.data} />
          </div>
            
      );
    }
});

ReactDOM.render(
   
       <Table url="http://localhost/x?sql=SELECT+*+FROM+dbo.Table2+FOR+XML+AUTO&root=root"/>,
  document.getElementById('content')
        );

