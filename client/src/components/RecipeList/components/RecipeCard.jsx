import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Modal, Button, Tag, Descriptions, Divider,
} from 'antd';
import {
  InfoCircleOutlined, StarOutlined, ExportOutlined, CloseCircleOutlined, StarFilled,
} from '@ant-design/icons';
import RecipeNames from './RecipeConsts';

const { Meta } = Card;

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, viewMore: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


  showModal() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }


  render() {
    const { recipe } = this.props;
    const {
      title, link, image: imageURL, totalTime, rating, numberOfRaters, tags, id,
    } = recipe;
    const viewMoreText = `${tags.length - 5} more`;
    const { showModal, viewMore } = this.state;

    const openRecipe = () => {
      window.open(link, 'noopener noreferrer');
    };

    const findSite = () => {
      for (const [siteRegex, siteName] of Object.entries(RecipeNames)) {
        const site = new RegExp(siteRegex);
        if (site instanceof RegExp && site.test(id)) {
          return siteName;
        }
      }
      return null;
    };

    return (
      <>
        <Card
          className="recipe-card"
          // onClick={() => openRecipe(link)}
          hoverable
          cover={(
            <img
              className="recipe-image"
              src={imageURL}
              alt={title}
              onClick={openRecipe}
            />
          )}

          actions={[
            <li className="recipe-button" onClick={this.showModal}><InfoCircleOutlined /></li>,
            <li className="recipe-button"><StarOutlined /></li>,
            <li className="recipe-button" onClick={openRecipe}><ExportOutlined /></li>,
          ]}
        >
          <Meta
            className="recipe-card-meta"
            title={title}
          />
        </Card>
        <Modal
          title={title}
          visible={showModal}
          onCancel={this.hideModal}
          footer={[
            <Button key="Save">
              <StarOutlined />
            </Button>,
            <Button key="Go" onClick={openRecipe}>
              <ExportOutlined />
            </Button>,
          ]}
        >
          <img
            className="recipe-modal-image"
            src={imageURL}
            alt={title}
          />

          <Divider />
          <Descriptions title="Recipe Info" layout="vertical" colon={false}>
            <Descriptions.Item label="Website">{ findSite(id) }</Descriptions.Item>
            <Descriptions.Item label="Cooking Time">
              {totalTime ? `${totalTime} minutes` : (
                <span>
                  {' '}
                  <CloseCircleOutlined />
                  {' '}
                  Unavailable
                  {' '}
                </span>
              ) }
            </Descriptions.Item>

            <Descriptions.Item label="Rating">
              { rating ? (
                <span>
                  {' '}
                  {parseFloat((rating * 5).toFixed(2))}
                  /5
                  {' '}
                  <StarFilled />
                  {' '}
                  from
                  {' '}
                  { numberOfRaters }
                  {' '}
                  {numberOfRaters > 1 ? 'raters' : 'rater'}
                  {' '}
                </span>
              ) : (
                <span>
                  {' '}
                  <CloseCircleOutlined />
                  {' '}
                  Unavailable
                  {' '}
                </span>
              ) }
            </Descriptions.Item>

            <Descriptions.Item label="Tags" span={3}>
              {
                    tags.map((tag, index) => (
                      <Tag
                        className="recipe-tag"
                        visible={index < 5 || viewMore}
                      >
                        {' '}
                        <span>
                          {' '}
                          {tag }
                          {' '}
                        </span>
                      </Tag>
                    ))
                }
              {tags.length > 5 && (
                <Button
                  className="more-tags-button"
                  onClick={() => {
                    this.setState({ viewMore: !viewMore });
                  }}
                  size="small"
                >
                  <span>
                    {!viewMore ? viewMoreText : 'Show less'}
                  </span>
                </Button>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string,
    totalTime: PropTypes.number,
    rating: PropTypes.number,
    numberOfRaters: PropTypes.number,
    tags: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
