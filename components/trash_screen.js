import MediaCollection from 'shared/components/media_collection/0.1';
import Selectable from 'shared/components/selectable/0.1';
import Reveal from 'shared/components/reveal/0.1';
import Timer from 'shared/components/timer/0.1';
import CustomCursorScreen from 'shared/components/custom_cursor_screen/0.1';

const TRY_AGAIN = '0';
const GOOD_JOB = '1';

class TrashScreenComponent extends CustomCursorScreen {
    start() {
        var center;

        super.start();

        center = this.refs['children-1'].refs['children-0'];
        ['selectable', 'timer', 'children-0'].forEach(ref => { center.refs[ref].incompleteRefs(); });

        this.incomplete();
    }
}

export default function (props, ref, key) {

    var playAudio = function (play, playNext) {
        var callback = playNext ? playAudio.bind(this, playNext) : _.noop;
        this.updateGameState({
            path: 'media',
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

    var openReveal = function (open, cb = _.noop) {
        this.updateGameState({
            path: 'reveal',
            data: {
                open,
            },
            callback: cb
        });

    };

    var timerAction = function (action, nextAction) {
        var callback = nextAction ? timerAction.bind(this, nextAction) : _.noop;

        this.updateGameState({
            path: 'timer',
            data: {
                action,
            },
            callback
        });
    };

    var selectableComplete = function () {
        openReveal.call(this, GOOD_JOB, timerAction.bind(this, 'stop', 'complete'));

    };

    var timerComplete = function () {
        if (_.get(props, 'data.reveal.open', '') === GOOD_JOB) return;

        openReveal.call(this, TRY_AGAIN);
    };

    var revealClose = function (r) {
        var self = this;

        openReveal.call(self, null);

        if (r === TRY_AGAIN) {
            timerAction.call(self, 'restart');
            self.updateGameState({
                path: 'selectable',
                data: {
                    incompleteRefs: true
                },
                callback: () => {
                    self.updateGameState({
                        path: 'selectable',
                        data: {
                            incompleteRefs: false
                        }
                    });
                },
            });
        }
    };

    return (
        <TrashScreenComponent
            {...props}
            ref={ref}
            key={key}
            id="trash"
            className={_.get(props, 'data.reveal.open', null) ? 'REVEAL-OPEN' : ''}
        >
            <MediaCollection
                ref="collection"
                play={_.get(props, 'data.media.play', null)}
            >
                <skoash.Audio
                    data-ref="correct"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Right.mp3`}
                />
                <skoash.Audio
                    data-ref="incorrect"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Wrong.mp3`}
                    complete
                />
            </MediaCollection>
            <skoash.Component className="center">
                <skoash.Component className="group">
                    <skoash.Component className="center">
                        <Reveal
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
                            assets={[
                                <skoash.Audio
                                    type="voiceOver"
                                    src={`${CMWN.MEDIA.VO}TryAgain.mp3`}
                                    complete
                                />,
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
                            ]}
                        />
                    </skoash.Component>
                    <Timer
                        ref="timer"
                        countDown={true}
                        action={_.get(props, 'data.timer.action', null)}
                        timeout={90000}
                        leadingContent={
                            <skoash.Image
                                src={`${CMWN.MEDIA.IMAGE}img_9.1.png`}
                            />
                        }
                        onComplete={timerComplete}
                    />
                    <Selectable
                        ref="selectable"
                        selectClass="HIGHLIGHTED"
                        onComplete={selectableComplete}
                        onSelect={onSelect}
                        incompleteRefs={_.get(props, 'data.selectable.incompleteRefs', false)}
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
                            <skoash.ListItem data-ref="coral" />,
                            <skoash.ListItem data-ref="crab" />,
                            <skoash.ListItem data-ref="octopus" />,
                            <skoash.ListItem data-ref="shell1" />,
                            <skoash.ListItem data-ref="fish1" />,
                            <skoash.ListItem data-ref="fish1" className="duplicate" />,
                            <skoash.ListItem data-ref="seahorse" />,
                            <skoash.ListItem data-ref="turtle" />,
                            <skoash.ListItem data-ref="fish2" />,
                            <skoash.ListItem data-ref="fish3" />,
                            <skoash.ListItem data-ref="fish3" className="duplicate" />,
                            <skoash.ListItem data-ref="jellyfish" />,
                            <skoash.ListItem data-ref="jellyfish" className="duplicate" />,
                            <skoash.ListItem data-ref="fish4" />,
                            <skoash.ListItem data-ref="lobster" />,
                            <skoash.ListItem data-ref="shell2" />,
                            <skoash.ListItem data-ref="fish5" />,
                            <skoash.ListItem data-ref="fish5" className="duplicate" />,
                            <skoash.ListItem data-ref="starfish" />,
                        ]}
                    />
                </skoash.Component>
            </skoash.Component>
        </TrashScreenComponent>
    );
}
