import React, {Fragment} from 'react';
import Container from '@material-ui/core/Container';
import {Icon} from '@iconify/react';
import trashOutline from '@iconify/icons-eva/trash-outline';
import PageWrapper from '../../components/container/container.component';
import Header from '../../components/header/header.component';

function FavoritesPage() {
  return (
    <Fragment>
      <Container>
        <PageWrapper>
          <Header
            textHeader="FAVORITE"
            textSubtitle={3}
            iconButton={
              <Icon
                height={24}
                width={24}
                icon={trashOutline}/>
            }/>
        </PageWrapper>
      </Container>
    </Fragment>
  );
};

export default FavoritesPage;
