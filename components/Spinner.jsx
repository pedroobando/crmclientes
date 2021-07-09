import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Spinner = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex min-h-screen items-center">
        <ClipLoader loading={true} css={override} size={60} />
      </div>
    </div>
  );
};

export default Spinner;
