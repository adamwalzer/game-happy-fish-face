const INCREMENT = 10;
const DECREMENT = 10;
const CORRECT_BUBBLES = 10;

const ANSWERS = [
    'swim',
    'washFace',
    'drinkIt',
    'brushTeeth',
    'takeShowers',
    'cleanHouse',
    'cook',
    'growCrops',
    'laundry',
    'washDishes',
];

export default function (props, ref, key) {
    let meterHeight = _.get(props, 'data.meter.height', 0);
    console.log(meterHeight);

    let onSelect = function (r, isCorrect) {
        let correct = _.get(props, 'data.score.correct', 0);
        let incorrect = _.get(props, 'data.score.incorrect', 0);
        let cbRef = 'dummy';

        if (isCorrect) {
            correct++;
            cbRef = 'slide-up';
            updateMeter.call(this, correct);
        } else {
            incorrect++;
            r = 'incorrect';
        }

        playAudio.call(this, r, playAudio.bind(this, cbRef, _.noop));

        this.updateGameState({
            path: 'score',
            data: {
                correct,
                incorrect,
            },
        });
    };

    let playAudio = function (r, cb) {
        this.updateGameState({
            path: 'media',
            data: {
                play: r
            },
            callback: cb
        });
    };

    let updateMeter = function (correct) {
        let percent = correct / CORRECT_BUBBLES;
        this.updateGameState({
            path: 'meter',
            data: {
                height: percent,
            }
        });
    };

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="multi-bubbles"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}WhatCan.mp3`}
            />
            <skoash.MediaCollection
                ref="media-collection"
                play={_.get(props, 'data.media.play', null)}
            >
                <skoash.Audio
                    data-ref="swim"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}Swim.mp3`}
                />
                <skoash.Audio
                    data-ref="washFace"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}WashFace.mp3`}
                />
                <skoash.Audio
                    data-ref="drinkIt"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}DrinkIt.mp3`}
                />
                <skoash.Audio
                    data-ref="brushTeeth"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}BrushTeeth.mp3`}
                />
                <skoash.Audio
                    data-ref="takeShowers"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}TakeShowers.mp3`}
                />
                <skoash.Audio
                    data-ref="cleanHouse"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}CleanHouse.mp3`}
                />
                <skoash.Audio
                    data-ref="cook"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}Cook.mp3`}
                />
                <skoash.Audio
                    data-ref="growCrops"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}GrowCrops.mp3`}
                />
                <skoash.Audio
                    data-ref="laundry"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}Laundry.mp3`}
                />
                <skoash.Audio
                    data-ref="washDishes"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}WashDishes.mp3`}
                />
                <skoash.Audio
                    data-ref="incorrect"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Wrong.mp3`}
                    complete
                />
                <skoash.Audio
                    data-ref="slide-up"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}SwervySlideUp.mp3`}
                    volume={.4}
                />
            </skoash.MediaCollection>
            <skoash.Repeater className="bubbles" ammount={14} />
            <skoash.Image src={`${CMWN.MEDIA.IMAGE}IMG_7.1.png`} className="clean-water" />
            <skoash.Component className="meter">
                <skoash.Image
                    src={`${CMWN.MEDIA.IMAGE}stroke.png`}
                    className="stroke"
                />
                <skoash.Component className="fill">
                    <skoash.Component style={{'height': meterHeight * 100 + '%'}}>
                        <skoash.Image
                            src={`${CMWN.MEDIA.IMAGE}meter.fill.png`}
                        />
                    </skoash.Component>
                    <skoash.Component style={{'height': meterHeight * 100 + '%'}} >
                        <skoash.Image
                            src={`${CMWN.MEDIA.IMAGE}img_1.1.png`}
                            style={{
                                'opacity': (Math.round(meterHeight) * meterHeight),
                            }}
                        />
                        <skoash.Image
                            src={`${CMWN.MEDIA.IMAGE}sickfish.png`}
                            style={{
                                'opacity': ((Math.round(meterHeight) ^ 1) * (1 - meterHeight)),
                            }}
                        />
                    </skoash.Component>
                </skoash.Component>
            </skoash.Component>
            <skoash.Selectable
                ref="selectable"
                onSelect={onSelect}
                selectClass="HIGHLIGHTED"
                answers={ANSWERS}
                list={[
                    <skoash.ListItem data-ref="swim" />,
                    <skoash.ListItem data-ref="washFace" />,
                    <skoash.ListItem data-ref="drinkIt" />,
                    <skoash.ListItem select data-ref="playBasketball" />,
                    <skoash.ListItem data-ref="brushTeeth" />,
                    <skoash.ListItem select data-ref="tellTime" />,
                    <skoash.ListItem data-ref="takeShowers" />,
                    <skoash.ListItem data-ref="cleanHouse" />,
                    <skoash.ListItem data-ref="cook" />,
                    <skoash.ListItem select data-ref="crochet" />,
                    <skoash.ListItem data-ref="growCrops" />,
                    <skoash.ListItem select data-ref="zipline" />,
                    <skoash.ListItem select data-ref="read" />,
                    <skoash.ListItem data-ref="laundry" />,
                    <skoash.ListItem select data-ref="drive" />,
                    <skoash.ListItem data-ref="washDishes" />,
                    <skoash.ListItem select data-ref="sleep" />,
                    <skoash.ListItem select data-ref="tapDance" />,
                    <skoash.ListItem select data-ref="flyAKite" />,
                    <skoash.ListItem select data-ref="talk" />,
                ]}
            />
            <skoash.Score
                ref="score"
                correct={_.get(props, 'data.score.correct', 0)}
                incorrect={_.get(props, 'data.score.incorrect', 0)}
                leadingContent={
                    <skoash.Image src={`${CMWN.MEDIA.IMAGE}IMG_7.2.png`} />
                }
                checkComplete={false}
                complete
                increment={INCREMENT}
                downIncrement={DECREMENT}
            />
        </skoash.Screen>
    );
}

