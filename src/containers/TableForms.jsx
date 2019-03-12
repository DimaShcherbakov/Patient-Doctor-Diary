import React from 'react';

class TableForms extends React.Component{
  render() {
    return(
      <section className="add-data-form">
          <div className="wrap-form">
            <p></p>
            <form >
              <div>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
              </div>
              <div>
                <span></span>
                <input type="text" value=""/>
                <input type="submit" value="Добавить"/>
              </div>
            </form>
          </div>
          <div className="wrap-form">
            <p></p>
            <form >
              <div>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
                <label htmlFor="">
                  <input type="text" name="" id=""/>
                </label>
              </div>
              <div>
                <span></span>
                <input type="text" value=""/>
                <input type="submit" value="Добавить"/>
              </div>
            </form>
          </div>
        </section>
    )
  }
}

export default TableForms;
