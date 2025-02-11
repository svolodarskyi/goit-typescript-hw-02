import React from 'react';
import s from './SearchBar.module.css';
import { Field, Form, Formik } from 'formik';
import { IoIosSearch } from 'react-icons/io';

export interface SearchBarProps {
  handleChangeInQuery: (query: string) => void;
  query: string;
}

interface FormValues {
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleChangeInQuery,
  query,
}) => {
  const onSubmit = (values: FormValues) => {
    handleChangeInQuery(values.query);
  };

  const initialValues: FormValues = {
    query,
  };

  return (
    <>
      <header className={s.headerSection}>
        <div className="container">
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            <Form className={s.form} autoComplete="off">
              <div className={s.fieldContainer}>
                <Field
                  className={s.searchBar}
                  name="query"
                  autoFocus
                  placeholder="Search images and photos"
                />
                <button type="submit">
                  <IoIosSearch className={s.searchIcon} />
                </button>
                <p className={s.poweredBySignature}>powered by unsplash.com</p>
              </div>
            </Form>
          </Formik>
        </div>
      </header>
    </>
  );
};

export default SearchBar;
