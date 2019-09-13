import React, { PureComponent } from 'react';
import { DisplayGallery, View, Navigator } from './../index';
import Photo from './../../../placeholders/Photo';
import './heroBanner.css';

class HeroBanner extends PureComponent {

    constructor(props) {
        super(props);

        const gallery_path = './../media-gallery/';
        const format = '.jpg';
        const media_gallery_paths = [
            { title: 'animals' },
            { title: 'books' },
            { title: 'business' },
            { title: 'coins' },
            { title: 'frog' },
            { title: 'girl' },
            { title: 'literature' },
            { title: 'money' },
            { title: 'reading' },
            { title: 'tabletop-photography' },
            { title: 'water' },
        ]

        this.images = media_gallery_paths.map(path => {
            return gallery_path + path.title + format
        })

        this.slides = this.images.map(img => {
            return <Photo src={img} />
        })
    }

    getTestVision = () => {
        return <div className={'test'}>
            {this.images.map((el, id) => {
                return (
                    <Navigator to={id}>
                        <img
                            key={id}
                            style={{
                                width: 100
                            }}
                            alt=""
                            src={el}
                        />
                    </Navigator>
                );
            })}
        </div>
    }

    getContent() {
        return (
            <>
                <DisplayGallery>
                    <div className={'banner'}>
                        <View
                            unique={'big-one'}
                            mode={'infinite'}
                            slidesToShow={1}
                            duration={200}
                            onTransitionEnd={(frame, gallery) => {
                                //console.log(frame, gallery);
                                return [frame, gallery];
                            }}
                        >
                            {this.slides}
                        </View>
                        <Navigator by={-99}>
                            <div className={'navigator'}>
                                {'<'}
                            </div>
                        </Navigator>
                        <Navigator by={199}>
                            <div className={'navigator navigator_right'}>
                                {'>'}                            </div>
                        </Navigator>
                    </div>
                    <div className={'dots'}>
                        {this.getTestVision()}
                    </div>
                </DisplayGallery>
            </>
        );
    }

    render() {
        return this.getContent();
    }
}

export default HeroBanner;
