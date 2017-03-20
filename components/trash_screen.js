import CustomCursorScreen from 'shared/components/custom_cursor_screen/0.1';

const TRY_AGAIN = '0';
const GOOD_JOB = '1';

export default function (props, ref, key) {
    var incompleteChildRefs = function () {
        var center = this.refs['children-1'].refs['children-0'];
        ['selectable', 'timer', 'children-0'].forEach(ref => { center.refs[ref].incompleteRefs(); });

        this.incomplete();
    };

    var playAudio = function (play, playNext) {
        var callback = playNext ? playAudio.bind(this, playNext) : _.noop;
        this.updateScreenData({
            key: 'media',
            data: {
                play
            },
            callback,
        });
    };

    var onSelect = function (r, isCorrect) {
        var play = isCorrect ? 'correct' : 'incorrect';
        playAudio.call(this, play, 'dummy');
    };

    var selectableComplete = function () {
        this.updateScreenData({
            data: {
                reveal: {
                    open: GOOD_JOB,
                },
                timer: {
                    stop: true,
                    complete: true,
                }
            },
        });
    };

    var timerComplete = function () {
        if (_.get(props, 'data.reveal.open', '') === GOOD_JOB) return;

        this.updateScreenData({
            data: {
                reveal: {
                    open: TRY_AGAIN,
                },
                timer: {
                    stop: true,
                    complete: true,
                }
            },
        });
    };

    var revealClose = function (r) {
        this.updateScreenData({
            data: {
                reveal: {
                    open: null,
                    close: true,
                },
            },
        });

        if (r === TRY_AGAIN) {
            this.updateScreenData({
                data: {
                    selectable: {
                        incompleteRefs: true
                    },
                    timer: {
                        restart: true,
                        stop: false,
                        complete: false,
                    },
                },
                callback: () => {
                    this.updateScreenData({
                        data: {
                            selectable: {
                                incompleteRefs: false
                            }
                        },
                    });
                },
            });
        }
    };

    return (
        <CustomCursorScreen
            {...props}
            ref={ref}
            key={key}
            id="trash"
            className={_.get(props, 'data.reveal.open', null) ? 'REVEAL-OPEN' : ''}
            onStart={incompleteChildRefs}
        >
            <skoash.MediaCollection
                ref="collection"
                play={_.get(props, 'data.reveal.open', null) || _.get(props, 'data.media.play', null)}
            >
                <skoash.MediaSequence silentOnStart>
                    <skoash.Audio
                        type="voiceOver"
                        src={`${CMWN.MEDIA.VO}GoodJob.mp3`}
                        complete
                    />
                    <skoash.Audio
                        type="voiceOver"
                        src={`${CMWN.MEDIA.VO}NeverThrow.mp3`}
                        complete
                    />
                </skoash.MediaSequence>,
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}TryAgain.mp3`}
                    complete
                />,
                <skoash.Audio
                    ref="correct"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Right.mp3`}
                />
                <skoash.Audio
                    ref="incorrect"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Wrong.mp3`}
                    complete
                />,
            </skoash.MediaCollection>
            <skoash.Component className="center">
                <skoash.Component className="group">
                    <skoash.Component className="center">
                        <skoash.Reveal
                            ref="reveal"
                            className="center"
                            onClose={revealClose}
                            openReveal={_.get(props, 'data.reveal.open', null)}
                            list={[
                                <skoash.Component type="li" complete>
                                    <skoash.Image src={`${CMWN.MEDIA.IMAGE}img_10.2.png`} />
                                    <p>
                                        You ran out of time!
                                    </p>
                                </skoash.Component>,
                                <skoash.Component type="li" className="tryAgain">
                                    <skoash.Image src={`${CMWN.MEDIA.IMAGE}img_10.1.png`} />
                                    <p>
                                        Take this offline.<br /> Never throw the trash in the water.
                                    </p>
                                </skoash.Component>,
                            ]}
                        />
                    </skoash.Component>
                    <skoash.Timer
                        ref="timer"
                        countDown={true}
                        action={_.get(props, 'data.timer.action', null)}
                        timeout={90000}
                        restart={_.get(props, 'data.timer.restart', false)}
                        stop={_.get(props, 'data.timer.stop', false)}
                        complete={_.get(props, 'data.timer.complete', false)}
                        leadingContent={
                            <skoash.Image
                                src={`${CMWN.MEDIA.IMAGE}img_9.1.png`}
                            />
                        }
                        onComplete={timerComplete}
                    />
                    <skoash.Selectable
                        ref="selectable"
                        selectClass="HIGHLIGHTED"
                        onComplete={selectableComplete}
                        onSelect={onSelect}
                        incompleteRefs={_.get(props, 'data.selectable.incompleteRefs', false)}
                        answers={[
                            'tire',
                            'floss',
                            'shoes',
                            'water',
                            'soda',
                            'bottle1',
                            'chips',
                            'necklace',
                            'bottle2',
                            'bottle3',
                            'beaker',
                            'oil',
                            'fries',
                            'bottle4',
                            'sauce',
                            'lightbulb',
                            'lotion',
                        ]}
                        list={[
                            <skoash.ListItem correct data-ref="tire" />,
                            <skoash.ListItem correct data-ref="floss" />,
                            <skoash.ListItem correct data-ref="shoes" />,
                            <skoash.ListItem correct data-ref="water" />,
                            <skoash.ListItem correct data-ref="soda" />,
                            <skoash.ListItem correct data-ref="bottle1" />,
                            <skoash.ListItem correct data-ref="chips" />,
                            <skoash.ListItem correct data-ref="necklace" />,
                            <skoash.ListItem correct data-ref="bottle2" />,
                            <skoash.ListItem correct data-ref="bottle3" />,
                            <skoash.ListItem correct data-ref="beaker" />,
                            <skoash.ListItem correct data-ref="oil" />,
                            <skoash.ListItem correct data-ref="fries" />,
                            <skoash.ListItem correct data-ref="bottle4" />,
                            <skoash.ListItem correct data-ref="sauce" />,
                            <skoash.ListItem correct data-ref="lightbulb" />,
                            <skoash.ListItem correct data-ref="lotion" />,
                            <skoash.ListItem complete data-ref="coral" />,
                            <skoash.ListItem complete data-ref="crab" />,
                            <skoash.ListItem complete data-ref="octopus" />,
                            <skoash.ListItem complete data-ref="shell1" />,
                            <skoash.ListItem complete data-ref="fish1" />,
                            <skoash.ListItem complete data-ref="fish1" className="duplicate" />,
                            <skoash.ListItem complete data-ref="seahorse" />,
                            <skoash.ListItem complete data-ref="turtle" />,
                            <skoash.ListItem complete data-ref="fish2" />,
                            <skoash.ListItem complete data-ref="fish3" />,
                            <skoash.ListItem complete data-ref="fish3" className="duplicate" />,
                            <skoash.ListItem complete data-ref="jellyfish" />,
                            <skoash.ListItem complete data-ref="jellyfish" className="duplicate" />,
                            <skoash.ListItem complete data-ref="fish4" />,
                            <skoash.ListItem complete data-ref="lobster" />,
                            <skoash.ListItem complete data-ref="shell2" />,
                            <skoash.ListItem complete data-ref="fish5" />,
                            <skoash.ListItem complete data-ref="fish5" className="duplicate" />,
                            <skoash.ListItem complete data-ref="starfish" />,
                        ]}
                    />
                </skoash.Component>
            </skoash.Component>
        </CustomCursorScreen>
    );
}
